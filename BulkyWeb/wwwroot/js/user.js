﻿
var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/admin/user/getall", // API URL'si doğru
            "type": "GET",                 // Gerekirse GET metodunu belirtin
            "dataSrc": "data"              // JSON içindeki "data" anahtarını belirtin
        },
        "columns": [
            { "data": "name", "width": "15%" },
            { "data": "email", "width": "15%" },
            { "data": "phoneNumber", "width": "15%" },
            { "data": "company.name", "width": "15%" },
            { "data": "role", "width": "15%" },
            {
                data: { id: "id", lockoutEnd: "lockoutEnd" },
                
                "render": function (data) {

                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();

                    if (lockout > today) {
                        return `
                                <div class="text-center" style="display:flex">
                                    <a onclick=LockUnlock('${data.id}')   class="btn btn-danger text-white" style="cursor:pointer; width:70px;">
                                        <i class="bi bi-lock-fill"></i>Unlock
                                    </a>

                                    <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-danger text-white" style="cursor:pointer; width:100px;">
                                        <i class="bi bi-pencil-square"></i>Permission
                                    </a>
                                </div>
                        
                                `
                    } else {
                        return `
                                <div class="text-center" style="display:flex" >
                                    <a onclick=LockUnlock('${data.id}') class="btn btn-success text-white" style="cursor:pointer; width:70px;">
                                        <i class="bi bi-unlock-fill"></i>UnLock
                                    </a>

                                    <a href="/admin/user/RoleManagement?userId=${data.id}" class="btn btn-danger text-white" style="cursor:pointer; width:100px;">
                                        <i class="bi bi-pencil-fill"></i>Permission
                                    </a>
                                </div>
                        
                                `
                    }

                },
                "width": "15%"
            },
        ]
    });
}


function LockUnlock(id) {
    $.ajax({
        type: "POST",
        url: '/Admin/User/LockUnlock',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();
            }
        }
    });
}




