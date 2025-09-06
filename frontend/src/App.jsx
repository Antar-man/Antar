import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout.jsx";   // adjust import path
import Navbar from "./Components/Navbar/nav.jsx";
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/Signup.jsx";

import Home from "./pages/Home.jsx";
import Journal from "./pages/Journal.jsx";
import Mood from "./pages/Mood.jsx";
import Growth from "./pages/Growth.jsx";
import Letters from "./pages/Letters.jsx";
import Resources from "./pages/Resources.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import QuestionnairePage from "./pages/QuestionnairePage.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import BreathExercise from "./pages/BreathExercise.jsx";

export default function App() {
  return (
    <>
      <BreathExercise />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/journal"
          element={
            <Layout>
              <Journal />
            </Layout>
          }
        />
        <Route
          path="/mood"
          element={
            <Layout>
              <Mood />
            </Layout>
          }
        />
        <Route
          path="/growth"
          element={
            <Layout>
              <Growth />
            </Layout>
          }
        />
        <Route
          path="/letters"
          element={
            <Layout>
              <Letters />
            </Layout>
          }
        />
        <Route
          path="/resources"
          element={
            <Layout>
              <Resources />
            </Layout>
          }
        />
        <Route
          path="/help"
          element={
            <Layout>
              <HelpPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />
            </Layout>
          }
        />

        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<QuestionnairePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
}
