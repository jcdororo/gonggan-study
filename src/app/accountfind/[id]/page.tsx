import ChangePwdForm from "@/app/components/FindAccount/ChangePwdForm";

export default function ChangePwd ({ params }: { params: { id: string } }) {
  const id = params?.id;
  return (
    <>
      <ChangePwdForm id={id} />
    </>
  )
}