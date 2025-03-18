import { useEffect, useState } from "react"
import "./index.css"
import React from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { TiMicrophone } from "react-icons/ti";
import { FaMicrophoneSlash } from "react-icons/fa6";

export function DiscursiveQuestion({ accomplish, question, handleSubmitAnswer }){

    const [answer, setAnswer] = useState("")
    const [listeningQuestionId, setListeningQuestionId] = useState(null);
    const [isListening, setIsListening] = useState(false)
    
    const commands = [
        {
            command: "Limpar",
            callback: () => speechResetStringFromAnswer()
        },
        {
            command: "Enviar atividade",
            callback: () => removeSendCommandFromAnswer()
        }
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands: commands});

    if (!browserSupportsSpeechRecognition) {
        alert("Seu navegador não possui suporte para reconhecimento de voz.")
    }

    function removeSendCommandFromAnswer(){
        const answerAux = answer.replace(/enviar atividade/i, "").trim();
        setAnswer(answerAux)
    }

    function speechResetStringFromAnswer(){
        resetTranscript()
        // document.getElementById(`inputDiscursiveAnswer${listeningQuestionId}`).value = answer;
    }

    function startListening() {
        console.log(question.id)
        setListeningQuestionId(question.id);
        setIsListening(true)
        resetTranscript()
        SpeechRecognition.startListening({ continuous: true });
    }

    function stopListening(){
        setListeningQuestionId(null)
        setIsListening(false)
        SpeechRecognition.stopListening()
    }

    useEffect(() => {
        if(accomplish == true){
            handleSubmitAnswer(question.id, answer)
        }
    }, [accomplish])

    useEffect(() => {
        if (listeningQuestionId === question.id) {
            setAnswer(transcript);
            console.log("Transcript: ", transcript)
        }
    }, [transcript])

    return(
        <div className="discursiveAnswer">
            <div className="discursiveInputContainer">
                <textarea id={`inputDiscursiveAnswer${question.id}`} onChange={(e) => setAnswer(e.target.value)} defaultValue={answer} name="" type="text" />
            </div>
            <div className="micIconContainer">
                {
                    !isListening ?
                        <button className="listenBtn" onClick={() => startListening()}><TiMicrophone /></button>
                    :
                        <button className="listenBtn" onClick={() => stopListening()}><FaMicrophoneSlash /></button>
                }
            </div>
        </div>
    )
}