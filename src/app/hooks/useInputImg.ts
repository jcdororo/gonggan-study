interface ImgUploadProps {
  e: React.ChangeEvent<HTMLInputElement>;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;  
}

export const useInputImg = (
                              e: React.ChangeEvent<HTMLInputElement>,
                              setImage: React.Dispatch<React.SetStateAction<File | null>>,
                              setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
                            ) => {
  if (!e.target.files || e.target.files.length === 0) {
    return;
  }
  const file = e.target.files[0]
  setImage(file)

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const result = reader.result as string; 
    setImagePreview(result);
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