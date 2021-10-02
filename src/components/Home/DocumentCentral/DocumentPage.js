import "./DocumentPage-style.css"
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useCallback, useContext, useEffect, useState } from "react/cjs/react.development";
import { FunctionContext } from "../../../wrappers/DocumentsScannerEditor";
import DocumentPopUp from "./DocumentPopUp";

const toolbarConfig = {
    toolbar: ['undo', 'redo', '|', 
    'bold', 'italic', 'link', 'strikethrough', 'underline', '|', 
    'heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 
    'numberedList', 'bulletedList', '|', 
    'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', '|',
    'indent', 'outdent', '|',
    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells'],
    fontSize: {options: [9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26]},
    indentBlock: {
        offset: .1,
        unit: 'in'
    },
    placeholder: "Fresh start is what we need...start typing!"
}

const DocumentPage = ({documentLoadHandler, document, documentHandler}) => {
    const [editor, setEditor] = useState(null);

    const documentInit = newEditor => {
        setEditor(newEditor);
    }

    useEffect(()=>{
        if(editor){
            editor.ui.getEditableElement().parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
        }
    }, [editor])

    const dataHandler = useCallback(()=>{
        const data = editor.getData();
        
        if(document.id || document.id === 0){
            return [document.id, data];
        }else{
            return [null, data];
        }
    }, [document, editor])

    const {popUpHandler} = useContext(FunctionContext);

    const sendPopHandler = e => {
        e.preventDefault();
        popUpHandler(true, 'document-page', <DocumentPopUp document={document} />);
    }

    return (
        <section className="document-container fd">
            <p className="doc-btn-container">
                <button onClick={()=>documentHandler(...dataHandler())}>
                    {
                        document.id || document.id === 0 ? "Edit" : "Save"
                    }
                </button>
                {document.id || document.id === 0 ?<>
                <button onClick={sendPopHandler}>
                    Send
                </button>
                </> : ""}
                <button onClick={()=>documentLoadHandler(null)}>
                    Exit
                </button>
            </p>
            <CKEditor 
                editor={DecoupledEditor}
                data={document.body}
                onReady={editor=>documentInit(editor)}
                config={toolbarConfig}
            />
        </section>
    )
}

export default DocumentPage;