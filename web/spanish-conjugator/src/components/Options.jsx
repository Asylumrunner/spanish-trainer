import { toggleLanguageDirectionality, toggleMood, toggleTense } from "../store";
import { useSelector, useDispatch} from 'react-redux';
import Select from "react-select";

function Options() {
    const dispatch = useDispatch()

    const { englishToSpanish, moods, tenses } = useSelector((state) => {
        return state.options;
    });

    const handleMoodToggle = (mood) => {
        dispatch(toggleMood(mood))
    }

    const handleTenseToggle = (tense) => {
        dispatch(toggleTense(tense))
    }

    const setLanguageDirection = () => {
        dispatch(toggleLanguageDirectionality())
    }

    const languageOptions = [
        { value: "englishToSpanish", label: "English to Spanish"},
        { value: "spanishToEnglish", label: "Spanish to English"}
    ]
    const chosenLanguage = englishToSpanish ? languageOptions[0]: languageOptions[1];

    const languageDropdown = <Select defaultValue={chosenLanguage} options={languageOptions} onChange={setLanguageDirection}/>
    const moodToggles = Object.entries(moods).map(([k, v]) => {
        return (<div key={k}>
            <input 
                type="checkbox"
                id={k}
                name={k}
                value={k}
                checked={v}
                onChange={() => {handleMoodToggle(k)}}
            /> {k}
        </div>)
    })

    const tenseToggles = Object.entries(tenses).map(([k, v]) => {
        return (<div key={k}>
            <input 
                type="checkbox"
                id={k}
                name={k}
                value={k}
                checked={v}
                onChange={() => {handleTenseToggle(k)}}
            /> {k}
        </div>)
    })

    return (
        <div>
            <div>{languageDropdown}</div>
            <div>Mood: {moodToggles}</div>
            <div>Tenses: {tenseToggles}</div>
        </div>
    )
}

export default Options;