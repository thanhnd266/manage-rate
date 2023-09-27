import Editor from "ckeditor5-custom-ndt/build/ckeditor";
// import Editor from 'ckeditor5-custom-upload-adapter/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './styles.scss';

export default function CkeditorItem({ ...props }) {
  const data = props?.data
  const setData = props?.setData
  const API_URL = "https://noteyard-backend.herokuapp.com"
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: 'POST',
              body: body,
            })
              .then(res => res.json())
              .then(res => {
                resolve({ default: `${API_URL}/${res.url}`})
              })
              .catch(err => {
                reject(err);
              })
          })
        })
      }
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    }
  }

  const configCkeditor5 = {
    cloudServices: {
      tokenUrl: "https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt",
      uploadUrl: "https://33333.cke-cs.com/easyimage/upload/"
    },
    mediaEmbed: {
      previewsInData: true,
    },
    link : {
      addTargetToExternalLinks: true,
    },
    extraPlugins: [uploadPlugin]
  }

  return (
    <div className="ckeditor-config">
      <CKEditor
        onReady={editor => {
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
          setData(data + " ");
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            // this.editor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data)
        }}
        config={configCkeditor5}
        editor={Editor}
        data={data || ''}
        {...props}
      />
    </div>
  )
}