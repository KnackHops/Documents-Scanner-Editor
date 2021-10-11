import "./DocumentPage-style.css"
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useCallback, useContext, useEffect, useState } from "react";
import { DocumentContext, UserContext, MenuContext } from "../../../wrappers/DocumentsScannerEditor";
import DocumentPopUp from "./DocumentPopUp";
import QRSavedPopUp from "./QRSavedPopUp";

const toolbarConfig = {
    toolbar: ['undo', 'redo', '|', 
    'bold', 'italic', 'link', 'strikethrough', 'underline', '|', 
    'heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 
    'numberedList', 'bulletedList', '|', 
    'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', '|',
    'indent', 'outdent', '|',
    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells'],
    fontSize: {options: [9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]},
    indentBlock: {
        offset: .1,
        unit: 'in'
    },
    placeholder: "Fresh start is what we need...start typing!"
}

const DocumentPage = ({documentLoadHandler, document, documentHandler, documentFetch}) => {
    const { unpinHandler, pinHandler } = useContext(DocumentContext);

    const { id } = useContext(UserContext);
    const [editor, setEditor] = useState(null);

    const documentInit = newEditor => {
        setEditor(newEditor);
    }

    useEffect(()=>{
        if(editor){
            console.log(editor.ui.getEditableElement().parentElement)
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

    const { popUpHandler } = useContext( MenuContext );

    const { username } = useContext( UserContext )

    const pinPopHandler = async e => {
        e.preventDefault();
        const con = window.confirm("Are you sure you want to pin this document?");

        if ( con ) {
            await pinHandler(username, id, document.id, document.title);
            documentFetch();
        }
    }

    const sendPopHandler = e => {
        e.preventDefault();
        popUpHandler(true, 'document-page', <DocumentPopUp document={document} />);
    }

    const unpinClicked = async e => {
        e.preventDefault();
        const con = window.confirm("Are you sure you want to unpin this document for you?");

        if ( con ) {
            await unpinHandler(id, document.id);
            documentFetch();
        }
    }

    const show_QR = () => {
        fetch(`https://document-editor-09.herokuapp.com/document/fetch-qr/?docid=${document.id}`,{
            method: 'GET',
            mode: 'cors'
        }).then(resp=> {
            if(resp.ok){
                if(resp.status === 204){
                    window.alert("document doesn't exist!");
                    return {qr_code: null};
                }else{
                    return resp.json();
                }
            }else{
                window.alert("Error fetching qr code!");
            }
        }).then(({qr_code})=>{
            if ( qr_code ) {
                popUpHandler(true, "show-qr", <QRSavedPopUp qr_image={qr_code} text={"Here is the QR Code!"}/>)
            } 
        })
    }

    return (
        <article className="document-container fd">
            <p className="doc-btn-container">
                <button onClick={()=>documentHandler(...dataHandler())}>
                    {
                        document.id || document.id === 0 ? "Edit" : "Save"
                    }
                </button>
                {document.id || document.id === 0 ?<>
                {
                    <>
                    <button onClick={sendPopHandler}>
                        Send
                    </button>
                    <button onClick={show_QR}>
                        Show QR
                    </button>
                    {
                        document.pinned ? 
                        <button onClick={unpinClicked}>
                            Unpin
                        </button> :
                        <button onClick={pinPopHandler}>
                            Pin
                        </button>
                    }
                    </>
                }
                </> : ""}
                <button onClick={()=>documentLoadHandler(null)}>
                    Exit
                </button>
            </p>
            <CKEditor 
                editor={DecoupledEditor}
                data={document.body}
                onReady={editor=>documentInit(editor)}
                config={toolbarConfig} />
            
        </article>
    )
}

export default DocumentPage;