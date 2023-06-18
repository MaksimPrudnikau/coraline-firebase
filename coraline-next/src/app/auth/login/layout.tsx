import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function loginLayout(props: IProps) {
  return (
    <section className={"w-screen h-screen flex items-center justify-center"}>
      <div className={"w-1/2 h-2/3 shadow-2xl bg-[#F5F8FF] rounded-[15px]"}>
        {props.children}
      </div>
    </section>
  );
}
