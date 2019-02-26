import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneNumberGeneratorComponent } from './phone-number-generator/phone-number-generator.component';


export const routes: Routes = [
    {path: '', component:  PhoneNumberGeneratorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
