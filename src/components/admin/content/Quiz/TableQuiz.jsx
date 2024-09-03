

const TableQuiz = (props) => {
    const {listQuiz, handleClickBtnUpdateQuizz, handleClickBtnDeleteQuizz } = props;
    return(
        <div className="mt-5 bdr-10">
            <h4>List Quizzes </h4>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return(
                            <tr key={`table-quiz-${index}`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button type="button" onClick={() => handleClickBtnUpdateQuizz(item)} className="btn btn-warning mx-2">Edit</button>
                                    <button type="button" onClick={() => handleClickBtnDeleteQuizz(item)} className="btn btn-danger mx-2">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default TableQuiz;