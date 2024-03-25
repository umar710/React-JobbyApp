import {BrowserRouter, Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  </BrowserRouter>
)

export default App
