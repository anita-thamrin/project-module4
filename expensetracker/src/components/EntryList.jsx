// EntryList.js

import React from 'react';

const EntryList = ({ entries, onDelete, onEdit }) => {
	return (
		<div className="table-responsive">
			<table className="table table-striped 
								table-bordered">
				<thead className="thead-dark">
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						entries.map((entry, index) => (
							<tr key={index}>
								<td>{entry.title}</td>
								<td>{entry.description}</td>
								<td>{entry.date}</td>
								<td>
									<button className="btn btn-sm 
													btn-warning mr-2"
										onClick={
											() =>
												onEdit(index)
										}>
										Edit
									</button>
									<button className="btn btn-sm btn-danger"
										onClick={
											() =>
												onDelete(index)
										}>
										Delete
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	);
};

export default EntryList;