import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // 배열 구조 분해 //

    const[error, setError] = useState();
   
    const errorHandler = () => {
        setError(null);
    }

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }

        if(+enteredUserAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        console.log(enteredName, enteredUserAge);
        
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }
    
    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
            <Card cssClass={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">UserName</label>
                    <input
                     id="username" 
                     type="text" 
                     ref={nameInputRef}
                     />
                    <label htmlFor="age">Age</label>
                    <input 
                        id="age" 
                        type="number" 
                        ref={ageInputRef}
                        />
                    <Button type="submit">AddUser</Button>
                </form>
            </Card>
        </Wrapper>
    )
}

export default AddUser;