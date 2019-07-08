<template>
    <v-layout>
        <v-btn class="md-6 ml-2-3 elevation-21" color="yellow" icon fab fixed id="bookMark">
            <v-icon>star</v-icon>
        </v-btn>
    </v-layout>
</template>

<script>

    export default {
        name: 'bookMark',
    };

    $(document).ready(function () {
        $('#bookMark').on('click', function (e) {
            var bookmarkURL = window.location.href;
            var bookmarkTitle = document.title;
            var triggerDefault = false;
            if (window.sidebar && window.sidebar.addPanel) {

                window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
            } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {

                var $this = $(this);
                $this.attr('href', bookmarkURL);
                $this.attr('title', bookmarkTitle);
                $this.attr('rel', 'sidebar');
                $this.off(e);
                triggerDefault = true;
            } else if (window.external && ('AddFavorite' in window.external)) {

                window.external.AddFavorite(bookmarkURL, bookmarkTitle);
            } else {

                alert((navigator.userAgent.toLowerCase()
                    .indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
            }
            return triggerDefault;
        });
    });
</script>
<style>
    .md-6 {
        bottom: 50px;
        left: 100px;
        margin: 0;
        padding: 0;
    }
</style>