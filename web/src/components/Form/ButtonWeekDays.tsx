import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonWeekDays(props: Props) {
  return (
    <button  {...props}
        type="button"
        className="w-8 h-8 rounded bg-zinc-900"
    >
    </button>
  );
}