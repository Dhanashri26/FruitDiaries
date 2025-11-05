import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { IndiblogComponent } from './components/indiblog/indiblog.component';
import { blogResolver } from './blog.resolver';

export const routes: Routes = [
    { path: '', component: BlogComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:id', component: IndiblogComponent, resolve: { blog: blogResolver } },
];
