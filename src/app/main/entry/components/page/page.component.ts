import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'page',
  templateUrl: 'page.component.html',
  styleUrls: [`page.component.scss`]
})
export class PageComponent implements OnInit {

  pageContent: any;
  page: any;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const page = params?.url ?? "home";
      this.pageContent = this.db.list('/pages', ref => ref.orderByChild('url').equalTo(page));
      this.pageContent.valueChanges().subscribe(p => {
        if (p[0]?.published) {
          this.page = p[0];
          this.title.setTitle(this.page.title);
          this.meta.updateTag({ content: 'View ' + this.page.title }, "name='description'");
        } else {
          this.router.navigate(['/page-not-found']);
        }
      });
    });
  }





}
