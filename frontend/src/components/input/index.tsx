import { useRef, useState } from "react";

import { getClassNames } from "@/utils/classnames";

const Input = ({
	id,
	name,
	type,
	autoComplete,
	onChange,
	onClick,
	onKeyDown,
	preValue,
	postValue,
	value,
	placeholder,
	required,
	disabled,
	outerClassName,
	className,
}: any) => {
	const inputRef = useRef<HTMLInputElement>(null);
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
				preValue
					? "px-4 sm:px-3 py-0"
					: postValue
					? "px-4 sm:px-3 py-0"
					: "p-0",
				"flex flex-row justify-start items-center rounded-full cursor-text",
				inputFocused ? "ring-1 ring-gray-500" : "ring-1 ring-gray-700",
				outerClassName
			)}
		>
			{preValue && (
				<div className="px-0 py-2 sm:py-3 text-gray-200 rounded-full">
					{preValue}
				</div>
			)}
			<input
				ref={inputRef}
				onBlur={() => setInputFocused(false)}
				onFocus={() => setInputFocused(true)}
				id={id}
				name={name}
				type={type}
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
					preValue
						? "px-0 py-2 sm:py-3 "
						: postValue
						? "px-0 py-2 sm:py-3 "
						: "px-4 py-3 sm:py-3 rounded-full",
					"bg-transparent placeholder-gray-700 border-none focus:border-none focus:outline-none focus:placeholder-gray-700 focus:ring-0",
					className
				)}
			/>
			{postValue && (
				<div className="px-0 py-2 sm:py-3 text-gray-200 rounded-full">
					{postValue}
				</div>
			)}
		</div>
	);
};

export { Input };
