import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTreeModule
} from '@angular/material';

const components = [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTreeModule
];

@NgModule({
    imports: components,
    exports: components
})

export class MaterialComponentsModule { }
