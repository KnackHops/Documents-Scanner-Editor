import "./DocumentPage-style.css"
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect } from "react";

const DocumentPage = ({documentHandler}) => {
    let editor = null;
    
    const documentInit = newEditor => {
        editor = newEditor;

        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    return (
        <section className="document-container fd">
            <p className="doc-btn-container">
                <button className="">
                    Save
                </button>
                <button className="" onClick={()=>documentHandler(0)}>
                    Exit
                </button>
            </p>
            <CKEditor 
                editor={DecoupledEditor}
                data="ya hallo!"
                onReady={editor=>documentInit(editor)}
            />
        </section>
    )
}

export default DocumentPage;