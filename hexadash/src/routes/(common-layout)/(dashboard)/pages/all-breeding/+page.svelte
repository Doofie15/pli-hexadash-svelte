<script>
import BreadcrumbOne from '$lib/components/breadcrumbs/BreadcrumbOne.svelte';
import PaginationBasic from '$lib/components/pagination/PaginationBasic.svelte';
import { Container, Row, Col } from 'sveltestrap';
import BreedingTable from '$lib/view/breeding/BreedingTable.svelte';
import BreedingTableToolbox from '$lib/components/toolbox/BreedingTableToolbox.svelte';

const breadcrumbData = {
pageTitle: 'All Breeding',
bcItem: 'Breeding',
bcItemActive: 'All Breeding'
};
</script>

<svelte:head>
<title>All Breeding Records</title>
</svelte:head>

<Container fluid>
<Row>
<Col lg={12}>
<BreadcrumbOne {...breadcrumbData} />
</Col>
</Row>
</Container>

<Container fluid>
<div class="orderPage mb-30">
<Row>
<Col lg={12}>
<div class="orderDatatable py-30 px-sm-30 px-20 radius-xl w-100 mb-30 border-0 bg-white shadow-regular">
<BreedingTableToolbox buttonText="Breeding" />

<BreedingTable />

<PaginationBasic pageDropdown={true} />
</div>
</Col>
</Row>
</div>
</Container>

<style lang="scss">
:global {
@import '../../../../../assets/sass/mixins/functions';
@import '../../../../../assets/sass/mixins/rfs';
@import '../../../../../assets/sass/mixins/media-queries';
@import '../../../../../assets/sass/components/table';
@import '../../../../../assets/sass/components/cart';
}
</style>
