import React, { useState } from 'react';
import { faqData } from '../utils/faqData';

const FAQItem = ({ question, answer }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<div className='mb-4'>
			<h3
				className={`font-bold text-lg mb-2 cursor-pointer ${
					expanded ? 'text-[#307996]' : 'text-gray-700'
				}`}
				onClick={toggleExpand}>
				{question}
			</h3>
			{expanded && <p className='text-gray-700'>{answer}</p>}
		</div>
	);
};

const FrequentQuestions = () => (
	<div className='bg-gray-100 p-auto'>
		<h2 className='text-4xl font-bold mb-4 text-center text-[#1c1934]'>
			Preguntas Frecuentes
		</h2>
		<div className='grid gap-8 p-24'>
			{faqData.map((item, index) => (
				<FAQItem
					key={index}
					question={item.question}
					answer={item.answer}
				/>
			))}
		</div>
	</div>
);

export default FrequentQuestions;
