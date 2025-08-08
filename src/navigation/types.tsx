import { Movie } from './movie';
export type RootStackParamList = {
   MainApp: {
    screen?: string;
    params?: object;
  };
  Onboarding: undefined;
  LoginScreen: undefined;
  LoginPage: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  Verification: undefined;
  CreatePassword: undefined;
  MovieDetailScreen: { movieId: number };
  

  Home: undefined;
  Category: { category: 'Comedy' | 'Animation' | 'Documentary' | 'All' };
  Popular: undefined;
  EditProfile: undefined;  
    Policies: undefined;
    Help:undefined;
    WatchLater:undefined;
     CategoryScreen: { 
      genreId: number; genreName: string 
          initialMovies?: Movie[];
    };
    

     
};
