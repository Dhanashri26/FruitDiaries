import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { IndiblogComponent } from './components/indiblog/indiblog.component';
import { blogResolver } from './blog.resolver';
import { blogsResolver } from './blogs.resolver';

export const routes: Routes = [
    { path: '', component: BlogComponent, resolve: { blogs: blogsResolver } },
    { path: 'blog', component: BlogComponent, resolve: { blogs: blogsResolver } },
    { path: 'blog/:id', component: IndiblogComponent, resolve: { blog: blogResolver } },
];
