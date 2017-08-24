import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  categories: FirebaseListObservable<any>;
  category: FirebaseObjectObservable<any>;
  newName: string;
  editMode: boolean;
  categoryKey: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MdSnackBar,
    public router: Router,
    public route: ActivatedRoute) {
    this.categories = db.list('/categories');
  }

  addCategory(newName: string) {
    if (newName) {
      if (this.editMode && this.categoryKey) {
        this.db.object('/categories/' + this.categoryKey).update({
          email: newName,
          slug: this.slugify(newName)
        });
      } else {
        this.categories.push({
          name: newName,
          slug: this.slugify(newName)
        });
      }

      let snackBarRef = this.snackBar.open('Category saved', 'OK!', {
        duration: 3000
      });

      setTimeout(() => {
        this.router.navigateByUrl('admin/product-categories');
      }, 3300);
    } else if (!newName) {
      let snackBarRef = this.snackBar.open('You must add a name for this category', 'OK!', {
        duration: 3000
      });
    }
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.categoryKey = params.key;
          this.db.object('/categories/' + params.key).subscribe(c => {
            this.newName = c.name;
          });
        } else {
          this.newName = null;
        }
    });
  }
}

