import { Movie } from './movie';
export type RootStackParamList = {
MainApp: { screen?: string; params?: object };
  Onboarding: undefined;
  LoginScreen: undefined;
  LoginPage: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
    Profile: undefined;
  Verification: undefined;
  CreatePassword: undefined;
  MovieDetail: { movieId: number };
  Home: undefined;
Search: undefined;
  Popular: undefined;
  EditProfile: undefined;  
    Policies: undefined;
    Help:undefined;
    Vip:undefined;
    WatchLater:undefined;
     CategoryScreen: { 
      genreId: number; genreName: string 
          initialMovies?: Movie[];
    };
    
};
