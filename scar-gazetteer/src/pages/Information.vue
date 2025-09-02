<template>
    <b-container class="infomation-content">
        <b-row>
            <b-col cols="3">
                <b-nav pills vertical>
                    <b-nav-item exact active-class="active" to="/information">General information</b-nav-item>
                    <b-nav-item active-class="active" to="/information/terminology">Terminology</b-nav-item>
                    <b-nav-item active-class="active" to="/information/statistics">Statistics</b-nav-item>
                    <b-nav-item active-class="active" to="/information/glossary">Glossary</b-nav-item>
                    <b-nav-item active-class="active" to="/information/naming-authorities">Naming authorities</b-nav-item>
                    <b-nav-item active-class="active" to="/information/history">History</b-nav-item>
                    <b-nav-item active-class="active" to="/information/data-and-validation">Data and validation</b-nav-item>
                    <b-nav-item active-class="active" to="/information/cga-characteristics">CGA characteristics</b-nav-item>
                    <b-nav-item active-class="active" to="/information/citation-information">Citation information</b-nav-item>
                    <b-nav-item active-class="active" to="/information/batch-instructions">Instructions for batch edits</b-nav-item>
                    <b-nav-item active-class="active" to="/information/themes">Themes</b-nav-item>
                </b-nav>
            </b-col>
            <b-col>
                <router-view />
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>
.infomation-content {
    max-width: 70em;
}
</style>
