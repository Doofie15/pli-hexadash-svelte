<script>
    import { Table } from 'sveltestrap';
	import sellers from '@data/PLIDATA/suppliers.json';

	$: checked = false;
	function toggleCheck() {
		checked ? (checked = false) : (checked = true);
	}
</script>

<div class="table-responsive">
    <Table class="mb-0" borderless>
        <thead>
            <tr class="userDatatable-header">
                <th>
                    <div class="d-flex align-items-center">
                        <div class="custom-checkbox  check-all">
                            <input class="checkbox" type="checkbox" id="check-all" on:click={toggleCheck} />
                            <label for="check-all">Name</label>
                        </div>
                    </div>
                </th>
                <th>
                    <span class="userDatatable-title">Company Name</span>
                </th>
                <th>
                    <span class="userDatatable-title">Address</span>
                </th>
                <th>
                    <span class="userDatatable-title">City</span>
                </th>
                <th>
                    <span class="userDatatable-title">Province</span>
                </th>
                <th>
                    <span class="userDatatable-title float-end">Email</span>
                </th>
                <th>
                    <span class="userDatatable-title float-end">Phone</span>
                </th>
                <th>
                    <span class="userDatatable-title float-end">Type</span>
                </th>
                <th>
                    <span class="userDatatable-title float-end">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each sellers as data, i}
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="userDatatable__imgWrapper d-flex align-items-center">
                                <div class="checkbox-group-wrapper">
                                    <div class="checkbox-group d-flex">
                                        <div
                                            class="checkbox-theme-default custom-checkbox checkbox-group__single d-flex"
                                        >
                                            <input
                                                class="checkbox"
                                                type="checkbox"
                                                id="check-grp-content-{i}"
                                                {checked}
                                            />
                                            <label for="check-grp-content-{i}" />
                                        </div>
                                    </div>
                                </div>
                                <a href={'#'} class="profile-image rounded-circle d-block"
                                    ><img src="{data.img}" alt="user" class="img-fluid" /></a
                                >
                            </div>
                            <div class="userDatatable-inline-title">
                                <a href={'#'} class="text-dark fw-500">
                                    <h6>{data.Name}</h6>
                                </a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.Companyname}</div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.Address}</div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.City}</div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.Province}</div>
                    </td>
                     <td>
                        <div class="userDatatable-title">{data.Email}</div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.Phone}</div>
                    </td>
                    <td>
                        <div class="userDatatable-title">{data.Type}</div>
                    </td>
                    <td>
                        <ul class="orderDatatable_actions mb-0 d-flex flex-wrap">
                            <li>
                                <a href={'#'} class="view">
                                    <i class="uil uil-eye" />
                                </a>
                            </li>
                            <li>
                                <a href={'#'} class="remove">
                                    <i class="uil uil-trash-alt" />
                                </a>
                            </li>
                        </ul>
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>
</div>

<style lang="scss">
	:global {
		@import '../../../../assets/sass/components/table';
	}
</style>

