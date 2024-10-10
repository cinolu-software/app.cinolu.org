import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import {setFormValue} from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import SVG from "@/CommonComponent/SVG";
import { useAppDispatch } from "@/Redux/Hooks";


const InterviewAttachment = () => {

    const [files, setFiles] = useState<ExtFile[]>([]);
    const dispatch = useAppDispatch();
    
    const updateFiles = (incomingFiles: ExtFile[]) => {
      setFiles(incomingFiles);
      dispatch(setFormValue({name:"attachment",value:incomingFiles[0].file?.name}))
    };
  
    const removeFile = (id: string | number | undefined) => {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

  
    return (
      <div className="product-upload ">
        <div className="mt-3 pe-4">
          <Dropzone onChange={(files)=>updateFiles(files)} value={files} maxFiles={1} header={false} footer={false} minHeight="80px" name="fileName1">
            {files.map((file: ExtFile) => (
              <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />
            ))}
            {files.length === 0 && (
              <div className="dz-message needsclick">
                <SVG iconId="file-upload1" />
                <h5>{'Joindre un fichier'}</h5>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
}

export default InterviewAttachment