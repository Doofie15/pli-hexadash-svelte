<script>
	import BreadcrumbOne from '$lib/components/breadcrumbs/BreadcrumbOne.svelte';
	import PaginationBasic from '$lib/components/pagination/PaginationBasic.svelte';
	import { Container, Row, Col } from 'sveltestrap';
	import SuppliersTable from '../../../../lib/view/dashboard/purchases/SuppliersTable.svelte';
	import TableToolbox from '../../../../lib/components/toolbox/TableToolboxsuppliers.svelte';


	const breadcrumbData = {
		pageTitle: 'Suppliers',
		bcItem: 'Purchases',
		bcItemActive: 'Sellers'
	};
</script>

<Container fluid>
	<Row>
		<Col lg={12}>
			<BreadcrumbOne {...breadcrumbData} />
		</Col>
	</Row>
</Container>

<Container fluid>
	<div class="orderPage">
		<Row>
			<Col lg={12}>
				<div
					class="orderDatatable global-shadow py-30 px-sm-30 px-20 radius-xl w-100 mb-30 border-0"
				>
					<TableToolbox filtering={false} buttonText="Suppliers" />

					<SuppliersTable />

					<PaginationBasic pageDropdown={true} />
				</div>
			</Col>
		</Row>
	</div>
</Container>

<style lang="scss">
	:global {
		@import './../../../../assets/sass/components/table';
	}
</style>