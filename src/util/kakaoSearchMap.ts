export default async function kakaoSearchMap(url:string) {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY


  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  });

  return response;
}