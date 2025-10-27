import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { IndiblogComponent } from './components/indiblog/indiblog.component';

export const routes: Routes = [
    { path: '', component: BlogComponent },
    { path: 'blog/:id', component: IndiblogComponent },
];
