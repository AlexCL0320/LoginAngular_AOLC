import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { MatIconModule } from '@angular/material/icon';
/**
 * @title Basic cards
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MenuComponent,  MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.css'
})

export class HeaderComponent {

}
