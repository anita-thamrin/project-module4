
import React,
{
	useState,
	useEffect
} from 'react';

const AddEntry = ({ onAdd, editIndex, entries }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	useEffect(() => {
		if (editIndex !== null) {
			const entryToEdit = entries[editIndex];
			setTitle(entryToEdit.title);
			setDescription(entryToEdit.description);
			setDate(entryToEdit.date);
		}
	}, [editIndex, entries]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !description || !date) return;
		onAdd({ title, description, date });
		setTitle('');
		setDescription('');
		setDate('');
	};

	return (
		<div>
			<h2>
				{
					editIndex !== null ?
						'Edit Entry' :
						'Add New Entry'
				}
			</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={
						(e) =>
							setTitle(e.target.value)
					} />
				<textarea
					placeholder="Description"
					value={description}
					onChange={
						(e) =>
							setDescription(e.target.value)
					}>
				</textarea>
				<input
					type="date"
					value={date}
					onChange={
						(e) =>
							setDate(e.target.value)} />
				<button type="submit">
					{
						editIndex !== null ?
							'Edit Entry' :
							'Add Entry'
					}
				</button>
			</form>
		</div>
	);
};

export default AddEntry;