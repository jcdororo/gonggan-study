import { connectDB } from "@/util/database";
import Place from "./Place";
import { PlaceProps } from "./Place"



export default async function HotPlace() {
  let result: PlaceProps[] = [];
  let result2 = [];
  let result3 = [];
  try {
    const db = (await connectDB).db('gonggan')
    // place 컬렉션의 모든것 
    result = await db.collection('place').find().toArray() as unknown as PlaceProps[]; 
    // like_place 컬렉션의 모든것
    result2 = await db.collection('like_place').find().toArray();    
    // 각 place의 like 갯수 찾기
    for(let i = 0; i< result.length; i++) {
      result3 = await db.collection('like_place').find({place_id: result[i]._id.toString()}).toArray();    
      result[i].like = result3.length;
    }
    result.sort((a, b) => b.like! - a.like! )
    
  } catch (error) {
    throw new Error(error?.toString());      
  }
  
  


  return (
    <div className="left-96 absolute w-90 h-80">
      <div className="text-2xl font-bold mb-2">핫한 공간</div>
      <div className="border-2 border-sygnature-brown rounded-lg h-auto">
        <Place result={JSON.parse(JSON.stringify(result))}/>
      </div>
    </div>
  )
}