jQuery(document).ready(function($) {

    $('.template_pagination').on('click', function(e) {

        $('.main-grid-card-parent-pulse').show();
        $('.main-grid-card-overlay').show();

        var cursor = $('[name="load_more"]').val();
        const search_val = $('[name="search_themes"]').val();
        const category_handle = $('.dropdown-item.templates.selected').attr('data-category');

        $this = $(this);

        $.ajax({
            url: mizan_importer_pro_whizzie_params.ajaxurl,
            type: 'POST',
            data: {
              action: 'pagination_load_content',
              cursor: cursor,
              search_val: search_val,
              category_handle: category_handle
            },
            success: function(response) {

                $('.main-grid-card-parent-pulse').hide();
                $('.main-grid-card-overlay').hide();
                
                if ( response.code == 200 && response.data.length ) {

                    var next_page = response.total_pages.hasNextPage;

                    if ( !next_page ) {
                        $this.hide();    
                    } else {
                        $('[name="load_more"]').val( response.total_pages.endCursor	 );
                    }

                    response.data.forEach((theme, i) => {

                        const product_node = theme.node;
                        
                        const imageUrl = product_node.images.edges[0]?.node?.src;

                        let product_permalink = product_node.onlineStoreUrl;                        
                        var demo_link = '';
                        if (product_node?.metafield?.value) {
                            demo_link = product_node.metafield.value;                               
                        }

                        if ( !product_node.hasOwnProperty('inCollection') || product_node?.inCollection) {

                            $('.main-grid-card.row.theme-templates').append(`
                                <div class="main-grid-card-parent col-lg-4 col-md-6 col-12">
                                    <div class="main-grid-card-parent-inner">
                                        <div class="main-grid-card-parent-inner-image-head">
                                            <img class="main-grid-card-parent-inner-image" src="`+ imageUrl +`" width="100" height="100" alt="`+ product_node.title +`">
                                        </div>
                                        <div class="main-grid-card-parent-inner-description">
                                            <h3>`+ product_node.title +`</h3>
                                            <div class="main-grid-card-parent-inner-button">
                                                <a target="_blank" href="`+ product_permalink +`" class="main-grid-card-parent-inner-button-buy">Buy Now</a>
                                                <a target="_blank" href="`+ demo_link +`" class="main-grid-card-parent-inner-button-preview">Demo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `);
                        }

                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX Error:', textStatus, errorThrown);
            }
        });
    });

    function templates_api_category_wise( category_handle, search_val ) {

        $.ajax({
            url: mizan_importer_pro_whizzie_params.ajaxurl,
            type: 'POST',
            data: {
              action: 'templates_api_category_wise',
              category_handle: category_handle,
              search_val: search_val
            },
            success: function(response) {                

                $('.main-grid-card-parent-pulse').hide();
                $('.main-grid-card-overlay').hide();
                
                if ( response.code == 200 && response.data.length ) {

                    var next_page = response.total_pages.hasNextPage;

                    if ( !next_page ) {
                        $('.template_pagination').hide();
                    } else {
                        $('.template_pagination').show();
                        $('[name="load_more"]').val( response.total_pages.endCursor	 );
                    }
                    
                    $('.main-grid-card.row.theme-templates').empty();

                    response.data.forEach((theme, i) => {

                        const product_node = theme.node;
                        
                        const imageUrl = product_node.images.edges[0]?.node?.src;

                        let product_permalink = product_node.onlineStoreUrl;                        
                        var demo_link = '';
                        if (product_node?.metafield?.value) {
                            demo_link = product_node.metafield.value;                               
                        }

                        if ( !product_node.hasOwnProperty('inCollection') || product_node?.inCollection) {

                            $('.main-grid-card.row.theme-templates').append(`
                                <div class="main-grid-card-parent col-lg-4 col-md-6 col-12">
                                    <div class="main-grid-card-parent-inner">
                                        <div class="main-grid-card-parent-inner-image-head">
                                            <img class="main-grid-card-parent-inner-image" src="`+ imageUrl +`" width="100" height="100" alt="`+ product_node.title +`">
                                        </div>
                                        <div class="main-grid-card-parent-inner-description">
                                            <h3>`+ product_node.title +`</h3>
                                            <div class="main-grid-card-parent-inner-button">
                                                <a target="_blank" href="`+ product_permalink +`" class="main-grid-card-parent-inner-button-buy">Buy Now</a>
                                                <a target="_blank" href="`+ demo_link +`" class="main-grid-card-parent-inner-button-preview">Demo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `);
                        }

                    });
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX Error:', textStatus, errorThrown);
            }
        });
    }

    jQuery('.main-grid-card.filter-templates .dropdown').on('click', function() {
        $('.main-grid-card.filter-templates .dropdown-toggle').dropdown();
    });

    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }    

    $('[name="search_themes"]').on('input', debounce(function() {
        const search_val = $(this).val();
    
        if (search_val.length > 2) {
            $('.main-grid-card-parent-pulse').show();
            $('.main-grid-card-overlay').show();
        }
    
        templates_api_category_wise('', search_val);
    }, 300));

    $('.dropdown-item.templates').on('click', function(event) {
        event.preventDefault();
        
        $('.dropdown-item.templates').removeClass('selected');
        $(this).addClass('selected');

        const category_handle = $(this).attr('data-category');

        $('.main-grid-card-parent-pulse').show();
        $('.main-grid-card-overlay').show();

        templates_api_category_wise( category_handle, '' );
    });

    $('#themeCouponCode').click(function() {
        var couponCode = $(this).text();
        
        var tempInput = $("<input>");        
        $("body").append(tempInput);        
        tempInput.val(couponCode).select();
        document.execCommand("copy");        
        tempInput.remove();
        
        alert("Coupon code copied to clipboard: " + couponCode);
    });

    $('.grid-install-free').on('click', function(e) {
        e.preventDefault();

        $('.main-grid-card-parent-free-loader').show();
        $('.main-grid-card-overlay').show();
        
        var install_btn = $(this);
        var theme_domain = install_btn.data('theme');

        $.ajax({
            url: mizan_importer_pro_whizzie_params.ajaxurl,
            type: 'POST',
            data: {
                action: 'mizan_importer_install_free_theme',
                theme_domain: theme_domain,
                _wpnonce: mizan_importer_pro_whizzie_params.wpnonce
            },
            success: function(response) {
                location.reload();
            },
            error: function() {
                alert('An error occurred. Please try again.');
            }
        });
    });
});