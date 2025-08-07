import { Movie } from './movie';


export type RootStackParamList = {
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
  MainApp: undefined; 
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
