<template>
    <div class="span9">
        <h1>Instructions for batch edits</h1>

        <p>These instructions are for SCAGI members. It is important to note that a CSV file is used as the upload file
            so that diacritics are maintained. If you open your CSV file in a spreadsheet such as Microsoft Excel, the
            diacritics will be corrupted</p>
        <p>
            To prepare a file for batch <strong>updates</strong> of existing place names:
        <ol>
            <li>Go to the <a href="/search">SCAR Composite Gazettteer of Antarctica search page</a> and perform a search
                that will retrieve the relevant records.</li>
            <li>On the search results page, click the button titled "Download" (blue button at top right).</li>

            <li>Open up the saved .csv file and perform edits.</li>
            <li>Remove rows that have not been updated.</li>
            <li>Email the .csv file to <a href="mailto:scar.cga@unisi.it">scar.cga@unisi.it</a>. Please include your
                name, organisation and contact details. The Italian SCAGI member, who maintains the content of the
                gazetteer, will review and update accordingly.</li>
        </ol>
        </p>
        <p>
            To prepare a file for batch <strong>additions</strong> of place names:
        <ol>
            <li>Open this <a href="/static/new_place_names_template.csv">.csv file template</a>.</li>
            <li>Insert new rows for each new place name with values corresponding to the headers in the first row</li>
            <li>Email the .csv file to <a href="mailto:scar.cga@unisi.it">scar.cga@unisi.it</a>. Please include your
                name, organisation and contact details. The Italian SCAGI member, who maintains the content of the
                gazetteer, will review and update accordingly.</li>
        </ol>
        </p>
    </div>
</template>

<script>
export default {
    name: "InformationGeneral",
    data: function () {
        return {
        }
    }
}
</script>
