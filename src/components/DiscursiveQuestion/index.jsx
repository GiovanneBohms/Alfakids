import { useEffect, useState } from "react"
import "./index.css"
import React from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { TiMicrophone } from "react-icons/ti";
import { FaMicrophoneSlash } from "react-icons/fa6";

export function DiscursiveQuestion({ accomplish, question, handleSubmitAnswer }){

    const [answer, setAnswer] = useState(null)
    
    const commands = [
        {
            command: "Limpar",
            callback: ({resetTranscript}) => resetTranscript()
        }
    ]

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands: commands});

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    useEffect(() => {
        if(accomplish == true){
            handleSubmitAnswer(question.id, answer)
        }
    }, [accomplish])

    useEffect(() => {
        setAnswer(transcript)
        console.log(transcript)
    }, [transcript])

    return(
        <div className="discursiveAnswer">
            <div className="discursiveInputContainer">
                {
                    transcript != "" ?
                        <textarea id="inputDiscursiveAnswer" value={transcript} name="" type="text" />
                    :
                        <textarea id="inputDiscursiveAnswer" onChange={(e) => setAnswer(e.target.value)} name="" type="text" />
                }
                
            </div>
            <div>
                {
                    !listening ?
                        <button className="listenBtn" onClick={() => SpeechRecognition.startListening({continuous: true})}><TiMicrophone /></button>
                    :
                        <button className="listenBtn" onClick={SpeechRecognition.stopListening}><FaMicrophoneSlash /></button>
                }
            </div>
        </div>
    )
}