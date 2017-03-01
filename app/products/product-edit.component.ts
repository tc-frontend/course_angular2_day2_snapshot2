import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router  } from '@angular/router';


import { IProduct } from './product';
import { ProductService } from './product-mock.service';

@Component({
    templateUrl: 'app/products/product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnDestroy {
 
    pageTitle: string = 'Product Edit';

    errorMessage: string;
    product: IProduct;
    private sub: Subscription;

     mode: string;
    productForm: FormGroup;
    isLoading: boolean = false;

    constructor( private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {
      
    }
    ngOnInit(): void {

        this.productForm = new FormGroup({
            productName: new FormControl(),
            productCode: new FormControl(),
            starRating: new FormControl(),
            description: new FormControl()
        });


        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }


    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
     
        this.product = product;
        this.productForm.patchValue({
            productName: product.productName,
            productCode: product.productCode,
            starRating: product.starRating,
            description: product.description
        });
        this.isLoading = false;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
            this.product.tags = [];
            this. mode='create'
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
            this.mode ='edit'
        }

    }

    addTag(): void {
        if(!this.product.tags){
            this.product.tags = [];
        }
        this.product.tags.push('');
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }
    

    saveProduct(formProduct: NgForm): void {
        console.log(formProduct.form);
        console.log('Saved: ' + JSON.stringify(formProduct.value));

        this.productService.saveProduct(this.product)
            .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.router.navigate(['/products']);
    }


    trackByIndex(index:number) {
        return index;
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}