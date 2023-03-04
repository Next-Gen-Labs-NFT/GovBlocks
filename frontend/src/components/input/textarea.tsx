import { useRef, useState } from "react";

import { getClassNames } from "@/utils/classnames";

const TextArea = ({
	id,
	name,
	autoComplete,
	onChange,
	onClick,
	onKeyDown,
	value,
	placeholder,
	rows,
	required,
	disabled,
	outerClassName,
	className,
}: any) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [inputFocused, setInputFocused] = useState<any>(false);

	const focusInput = () => {
		if (inputRef && inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div
			onClick={() => focusInput()}
			className={getClassNames(
				"p-0",
				"flex flex-row justify-start items-center rounded-3xl cursor-text",
				inputFocused ? "ring-1 ring-gray-500" : "ring-1 ring-gray-700",
				outerClassName
			)}
		>
			<textarea
				ref={inputRef}
				onBlur={() => setInputFocused(false)}
				onFocus={() => setInputFocused(true)}
				id={id}
				name={name}
				rows={rows}
				autoComplete={autoComplete}
				onChange={onChange}
				onClick={onClick}
				onKeyDown={onKeyDown}
				value={value || ""}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				data-form-type="other"
				className={getClassNames(
					"px-4 py-3 sm:py-3 rounded-3xl",
					"text-sm sm:text-sm bg-transparent placeholder-gray-400 border-none focus:border-none focus:outline-none focus:placeholder-gray-400 focus:ring-0",
					className
				)}
			/>
		</div>
	);
};

export { TextArea };
