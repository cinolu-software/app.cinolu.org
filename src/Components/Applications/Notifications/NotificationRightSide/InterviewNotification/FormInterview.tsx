import React from 'react'
import SVG from "@/CommonComponent/SVG";
import { ImagePath } from "@/Constant";
import DownloadLink from "react-download-link";
import SimpleMdeReact from "react-simplemde-editor";
import InterviewAttachment from './InterviewAttachment';

const FormInterview = () => {

    return (
        <div className="user-body">
            <div>
                <input className='form-control mb-4' />
            </div>
            <div className="">
                <div id="editor">
                    <SimpleMdeReact id="editor_container"  options={{ autofocus: true, spellChecker: false }} />
                </div>
            </div>
            <div className='my-3'>
                <InterviewAttachment/>
            </div>
        </div>
    );
}

export default FormInterview