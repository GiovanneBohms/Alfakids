import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ChatbotPage } from '../pages/ChatbotPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { SelectedActivityPage } from '../pages/SelectedActivityPage';
import { ProfessorLogin } from '../pages/ProfessorLogin';
import { ActivitiesManagement } from '../pages/ActivitiesManagement';
import { ClassroomManagement } from '../pages/ClassroomManagement';
import { AddClassroomPage } from '../pages/AddClassroomPage';
import { EditClassroomPage } from '../pages/EditClassroomPage';
import { EditActivityPage } from '../pages/EditActivityPage';
import { EditQuestionPage } from '../pages/EditQuestionPage';
import { AddQuestionPage } from '../pages/AddQuestionPage';
import { AddActivityPage } from '../pages/AddActivityPage';
import { useAuth } from '../hooks/useAuth';
import { Fragment } from 'react';
import { RegisterPage } from '../pages/RegisterPage';
import { InitialLoadingIcon } from '../components/InitialLoadingIcon';
import { StudentAccomplishmentPage } from '../pages/StudentAccomplishmentPage';

function PrivateStudentRoute({ Component }){
    const { student_signed, isLoading } = useAuth();

    return (
        student_signed > 0 ? 
            <Component /> 
        :
            isLoading ?
                <InitialLoadingIcon />
            :
                <LoginPage />
    )
}

function PrivateProfessorRoute({ Component }){
    const { professor_signed, isLoading } = useAuth();

    return (
        professor_signed > 0 ? 
            <Component />
        :
            isLoading ?
                <InitialLoadingIcon />
            :
                <ProfessorLogin />
    )
}

function PrivateRoute({ Component }){
    const { student_signed, professor_signed, isLoading } = useAuth();

    return (
        professor_signed > 0 || student_signed > 0 ? 
            <Component />
        :
            isLoading ?
                <InitialLoadingIcon />
            :
                <LoginPage />
    )
}

export function RoutesComponent(){

    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route path='chatbot' element={<PrivateStudentRoute Component={ChatbotPage} />} />
                    <Route path='activities' element={<PrivateStudentRoute Component={ActivitiesPage} />} />
                    <Route path='selected-activity/:id_activity' element={<PrivateStudentRoute Component={SelectedActivityPage} />} />
                    <Route path='login/professor' element={<ProfessorLogin />} />
                    <Route path='activities/management' element={<PrivateProfessorRoute Component={ActivitiesManagement} />} />
                    <Route path='activities/management/add' element={<PrivateProfessorRoute Component={AddActivityPage} />} />
                    <Route path='classroom/management' element={<PrivateProfessorRoute Component={ClassroomManagement} />} />
                    <Route path='classroom/management/add' element={<PrivateProfessorRoute Component={AddClassroomPage} />} />
                    <Route path='classroom/management/edit/:id_classroom' element={<PrivateProfessorRoute Component={EditClassroomPage} />} />
                    <Route path='activities/management/edit/:id_activity' element={<PrivateProfessorRoute Component={EditActivityPage} />} />
                    <Route path='activities/management/edit/question/edit/:id_question' element={<PrivateProfessorRoute Component={EditQuestionPage} />} />
                    <Route path='activities/management/edit/question/add/:id_activity' element={<PrivateProfessorRoute Component={AddQuestionPage} />} />
                    <Route path='accomplishment/:id_activity/:id_student' element={<PrivateRoute Component={StudentAccomplishmentPage} />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}