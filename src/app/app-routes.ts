import { Routes } from '@angular/router';
/*
Defining the routes for the app navigation
*/
export const routes: Routes = [
     {
       path: 'chat',
       loadChildren: './chat/chat.module#ChatModule'
     }
];
