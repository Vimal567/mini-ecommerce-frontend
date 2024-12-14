import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';  // Import this for production mode
import { AppModule } from './app/app.module';

enableProdMode();  // Disable Angular's development mode (this will also suppress related messages)

platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
})
    .catch(err => console.error(err));
