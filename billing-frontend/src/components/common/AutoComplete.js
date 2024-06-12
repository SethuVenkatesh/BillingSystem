import React ,{useEffect, useState,useCallback} from 'react'
import SuggestionList from './SuggestionList';
import { debounce } from "lodash"
const AutoComplete = ({
    placeholder="",
    customLoading =<>Loading...</>,
    onSelect = () => {},
    dataKey = "",
    fetchSuggestions,
    staticData
}) => {

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) =>{
    setInputValue(e.target.value);
  }

  const getSuggestions =async (query) =>{
    setLoading(true);
    try{
        let result;
        console.log("getSuggestion",staticData)
        if(staticData){
            result = staticData.filter((item) => {
                return item.item_name.toLowerCase().includes(query.toLowerCase());
            });
        }
        else if(fetchSuggestions){
            result =await fetchSuggestions(query);
        }
        setSuggestions(result);
    }catch{
        setSuggestions([]);
    }finally{
        setLoading(false);
    }
  }

  const getSuggestionsDebounced = useCallback(debounce(getSuggestions,1000),[])

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion)
    setSuggestions([]);
  };


  useEffect(() =>{
        if(inputValue.length > 1){
            getSuggestionsDebounced(inputValue)
        }else{
            setSuggestions([]);
        }
    
  },[inputValue])

  return (
    <div className='mb-4 relative'>

        <div className='relative'>
            <input type="text" id="floating_outlined" class="block px-2 pb-2 pt-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} value={inputValue} />
            <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 pointer-events-none capitalize">{placeholder}</label>
        </div>
        {
            ( suggestions.length >= 1 || loading ) &&
            <ul className='w-full absolute z-20 bg-white border border-gray-300'>
                {loading && <div className='text-slate-500 font-semibold p-2'>{customLoading}</div>}
                <SuggestionList
                    suggestions = {suggestions}
                    dataKey = {dataKey}
                    highlight= {inputValue}
                    onSuggestionClick = {handleSuggestionClick}
                />
            </ul>
        }   

        
    </div>
  )
}

export default AutoComplete