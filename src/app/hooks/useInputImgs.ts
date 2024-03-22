interface ImgUploadProps {
  e: React.ChangeEvent<HTMLInputElement>;
  image: File[];
  setImage: React.Dispatch<React.SetStateAction<File>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<[]>>;  
}

export const useInputImgs = (
  e: React.ChangeEvent<HTMLInputElement>,
                              image: File[],
                              setImage: React.Dispatch<React.SetStateAction<File[]>>,
                              imagePreview: string[],
                              setImagePreview: React.Dispatch<React.SetStateAction<string[]>>
                            ) => {
  if (!e.target.files || e.target.files.length === 0) {
    return;
  }
  const file = e.target.files[0]
  
  setImage([...image,file])


  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const result = reader.result as string; 
    setImagePreview([...imagePreview,result]);
  }
  

}

/*
아래와 같이 사용
  const imageRef = useRef<HTMLInputElement>(null);



      <input 
        type='file'
        ref={imageRef}
        accept='image/*'
        multiple={false}    
        onChange={handleChange}   
        className='hidden' 
      />
      <button onClick={handleClick}>Input</button>
*/ 