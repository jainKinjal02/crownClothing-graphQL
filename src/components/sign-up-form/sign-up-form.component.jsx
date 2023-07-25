import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

import FormInput from '../form-input/form-input.component';
import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{

    const [formFields , setFormFields] = useState(defaultFormFields);
    const { displayName , email , password , confirmPassword} = formFields;
    const dispatch = useDispatch()

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    //console.log(formFields);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try{
            dispatch(signUpStart(email,password,displayName));

            resetFormFields();
          
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log('user creation encountered an error',error);
            }
           
        }
    }

    const handleChange = (event)=>{
        const {name , value} = event.target;

        setFormFields({...formFields , [name]: value});

        
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
               <FormInput 
                    label="Display Name"
                    inputOptions={{
                        type : 'text',
                        required : true,
                        onChange : handleChange,
                        name :'displayName',
                        value : displayName
                    }}
                    />

                <FormInput label="Email"
                inputOptions ={{  type:"email", required:true, onChange:handleChange ,name:"email", value:email}}
              />
               

               
                <FormInput label="Password" inputOptions={{type :"password", required: true, onChange:handleChange ,name:"password" ,value:password}} />

            
                <FormInput label="Confirm Password" inputOptions={{type:"password", required: true, onChange:handleChange ,name:"confirmPassword" ,value:confirmPassword}} />

                <Button type="submit"  buttonType='inverted' children='Sign Up'/>
            </form>
        </div>
    )
}

export default SignUpForm;