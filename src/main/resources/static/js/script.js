window.onload = () => {
    getList();
};

function switchType(value){
    if(typeof value == 'string'){
        switch(value){
            case "1": return "Reversing";
            case "2": return "Web";
            case "3": return "Pwnable";
            case "4": return "Forensics";
            case "5": return "MISC";
            default: return false;
        }
    } else {
        switch(value){
            case 1: return "Reversing";
            case 2: return "Web";
            case 3: return "Pwnable";
            case 4: return "Forensics";
            case 5: return "MISC";
            default: return false;
        }
    }
}

function getList(){
    $.ajax({
        type: 'GET',
        url: '/list',
        dataType: "json",
        success: (data) => {
            var html = "<tr>";
            html += "<td class='col-2'>type</td>";
            html += "<td class='col-3'>title</td>";
            html += "<td class='col-3'>review</td>";
            html += "<td class='col-2'>site</td>";
            html += "<td class='col-1'>modify</td>";
            html += "<td class='col-1'>delete</td>";
            html += "</tr>";

            if(data.length > 0){
                data.forEach((item) => {
                    var type = switchType(item.type);
                    html += "<tr id='"+item.id+"'>";
                    html += "<td class='col-2'>"+type+"</td>";
                    html += "<td class='col-3'>"+item.title+"</td>";
                    html += "<td class='col-3'>"+item.review+"</td>";
                    html += "<td class='col-2'><a href='"+item.url+"' target='_blank'>site</a></td>";
                    html += "<td class='col col-1'><a href='javascript:void(0);' onclick='updateItem(this, "+item.id+"); return false;'><i class='fas fa-pencil-alt'></i></a></td>";
                    html += "<td class='col col-1'><a href='javascript:void(0);' onclick='deleteItem("+item.id+"); return false;'><i class='fas fa-trash-alt'></i></a></td>";
                    html += "</tr>";
                });
            }
            $("table").html(html);
        },
        error: (e) => {
            console.log('getList :: error', e);
        }
    });
}

function addItem(){
    var type = switchType($("#type").val());
    var title = $("#title").val();
    var review = $("#review").val();
    var url = $("#url").val();
    var data = {
        "type": $("#type").val(),
        "title": title,
        "review": review,
        "url": url
    }
    $.ajax({
        type: 'POST',
        url: '/',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            if(data != 0){
                alert("something is wrong!");
                return;
            }
            $("#type").val(1);
            $("#title").val("");
            $("#review").val("");
            $("#url").val("");

            getList();
        },
        error: (e) => {
            console.log('addItem :: error', e);
        }
    });
}

function deleteItem(id){
    $.ajax({
        type: 'DELETE',
        url: '/'+id,
        success: (data) => {
            if(data != 0){
                alert("something is wrong!");
                return;
            }
            getList();
        },
        error: (e) => {
            console.log('deleteItem :: error', e);
        }
    });
}

function updateItem(element, id){
    var elements = $(element).closest('tr').children();
    var type = $(elements).eq(0);
    var title = $(elements).eq(1);
    var review = $(elements).eq(2);
    var url = $(elements).eq(3);

    var check1 = "", check2 = "", check3 = "", check4 = "", check5 = "";
    switch(type.text()){
        case "Reversing": check1 = "selected"; break;
        case "Web": check2 = "selected"; break;
        case "Pwnable": check3 = "selected"; break;
        case "Forensics": check4 = "selected"; break;
        case "MISC": check5 = "selected"; break;
    }

    var type_input = "<select class='form-select form-select-sm' aria-label='.form-select-sm' id='m_type' style='width:auto;'>";
    type_input += "<option value='1' "+check1+">Reversing</option>";
    type_input += "<option value='2' "+check2+">Web</option>";
    type_input += "<option value='3' "+check3+">Pwnable</option>";
    type_input += "<option value='4' "+check4+">Forensics</option>";
    type_input += "<option value='5' "+check5+">MISC</option>";
    type_input += "</select>";

    type.html(type_input);
    title.html("<input type='input' class='form-control' id='m_title' value='"+$(title).text()+"'>");
    review.html("<input type='input' class='form-control' id='m_review' value='"+$(review).text()+"'>");
    url.html("<input type='input' class='form-control' id='m_url' value='"+$(url).find('a').attr('href')+"'>");
    $(elements).eq(4).html("<a href='javascript:void(0);' onclick='updateItem_ajax("+id+"); return false;'><i class='fas fa-check'></i></a>");
}

function updateItem_ajax(id){
    var data = {
        "type": $("#m_type").val(),
        "title": $("#m_title").val(),
        "review": $("#m_review").val(),
        "url": $("#m_url").val()
    }
    $.ajax({
        type: 'PATCH',
        url: '/'+id,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            if(data != 0){
                alert("something is wrong!");
                return;
            }
            getList();
        },
        error: (e) => {
            console.log("modifyItem_ajax :: error", e);
        }
    });
}