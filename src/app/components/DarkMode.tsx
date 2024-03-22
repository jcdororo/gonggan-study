import { useRecoilState } from "recoil";
import { useDarkMode } from "../hooks/useDarkmode"
import { themeState } from "../atom";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";

export default function DarkMode() {

  const [_, toggleTheme] = useDarkMode();
  const [theme] = useRecoilState(themeState);

  return (
    <>
      <div onClick={toggleTheme} className={theme.value}>
        {
          theme.value == 'light'
            ? <IoSunny size={30} color="#998373" />
            : <MdOutlineDarkMode size={30} color="#998373" />
        }
      </div>
    </>
  )
}