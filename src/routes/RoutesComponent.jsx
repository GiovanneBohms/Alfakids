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

function PrivateRoute({ Component }){
    const { signed } = useAuth();

    return signed > 0 ? <Component /> : <LoginPage />
}

export function RoutesComponent(){

    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='login' element={<LoginPage />} />
                    <Route path='chatbot' element={<PrivateRoute Component={ChatbotPage} />} />
                    <Route path='activities' element={<PrivateRoute Component={ActivitiesPage} />} />
                    <Route path='selected-activity/:id_activity' element={<PrivateRoute Component={SelectedActivityPage} />} />
                    <Route path='login/professor' element={<ProfessorLogin />} />
                    <Route path='activities/management' element={<ActivitiesManagement />} />
                    <Route path='activities/management/add' element={<AddActivityPage />} />
                    <Route path='classroom/management' element={<ClassroomManagement />} />
                    <Route path='classroom/management/add' element={<AddClassroomPage />} />
                    <Route path='classroom/management/edit/:id_classroom' element={<EditClassroomPage />} />
                    <Route path='activities/management/edit/:id_activity' element={<EditActivityPage />} />
                    <Route path='activities/management/edit/question/edit/:id_question' element={<EditQuestionPage />} />
                    <Route path='activities/management/edit/question/add/:id_activity' element={<AddQuestionPage />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}